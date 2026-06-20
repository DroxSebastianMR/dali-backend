export class VersionUtil {
  static compare(a: string, b: string): number {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);

    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const diff = (pa[i] || 0) - (pb[i] || 0);
      if (diff !== 0) return diff;
    }
    return 0;
  }

  static isLower(client?: string, min?: string): boolean {
    if (!client || !min) return false;
    return this.compare(client, min) < 0;
  }
}
