import Pdf from './pdf';
import Images from './images';

export function DocumentTypes() {
  return {
    pdf: Pdf,
    jpeg: Images,
    jpg: Images,
    png: Images,
  };
}
