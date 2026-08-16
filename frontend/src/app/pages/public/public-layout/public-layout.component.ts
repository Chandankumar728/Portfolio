import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { routeFade } from '../../../shared/animations';
import { ContactInfo, PortfolioDataService } from '../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
  animations: [routeFade]
})
export class PublicLayoutComponent implements OnInit, OnDestroy {
  private readonly portfolioService = inject(PortfolioDataService);
  private scrollSubscription?: Subscription;
  private tickingScroll = false;

  readonly year = new Date().getFullYear();
  readonly scrolled = signal(false);
  readonly mobileMenuOpen = signal(false);
  readonly contact = signal<ContactInfo | null>(null);

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => this.contact.set(data.contact));

    this.scrollSubscription = fromEvent(window, 'scroll', { passive: true }).subscribe(() => {
      if (this.tickingScroll) {
        return;
      }
      this.tickingScroll = true;
      requestAnimationFrame(() => {
        this.scrolled.set(window.scrollY > 40);
        this.tickingScroll = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
    document.body.style.overflow = '';
  }

  routeKey(outlet: RouterOutlet): string {
    return outlet.isActivated ? (outlet.activatedRoute.snapshot.url.join('/') || 'home') : '';
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
    document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    if (this.mobileMenuOpen()) {
      this.mobileMenuOpen.set(false);
      document.body.style.overflow = '';
    }
  }
}
