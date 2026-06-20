import { Injectable } from '@nestjs/common';

@Injectable()
export class BannerScorer {
  private getDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  scoreByLocation(banners: any[], lat1: number, lng1: number) {
    return banners
      .map((banner) => {
        let minDistance = Infinity;

        for (const location of banner.locations) {
          const lat2 = Number(location.latitude);
          const lng2 = Number(location.longitude);

          if (!isNaN(lat2) && !isNaN(lng2)) {
            const d = this.getDistanceKm(lat1, lng1, lat2, lng2);
            minDistance = Math.min(minDistance, d);
          }
        }

        return {
          banner,
          distance: minDistance === Infinity ? 9999 : minDistance,
        };
      })
      .sort((a, b) => a.distance - b.distance);
  }
}
