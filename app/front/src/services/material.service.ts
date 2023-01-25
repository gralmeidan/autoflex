import { type Material } from '../types/materials.types';
import ItemService from './item.service';

class MaterialService extends ItemService<Required<Material>, Material[]> {
  constructor() {
    super('materials');
  }
}

// Seems redundant but we're declaring the variable first for intellisense
const materialService = new MaterialService();
export default materialService;
