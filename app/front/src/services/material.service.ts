import { type Material } from '../types/materials.types';
import ItemService from './item.service';

class MaterialService extends ItemService<
  Material,
  Material[],
  Pick<Material, 'name' | 'quantity'>
> {
  constructor() {
    super('materials');
  }
}

// Seems redundant but we're declaring the variable first for intellisense
const materialService = new MaterialService();
export default materialService;
