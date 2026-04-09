import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PwaService {
  constructor(private readonly swUpdate: SwUpdate) {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(() => {
        void this.activateUpdate();
      });
  }

  private async activateUpdate(): Promise<void> {
    await this.swUpdate.activateUpdate();
    window.location.reload();
  }
}
