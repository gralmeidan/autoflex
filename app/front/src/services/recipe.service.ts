import axios from 'axios';
import ApiService from './api.service';
import { type RecipeEntry } from '../types/recipes.types';

class RecipeService extends ApiService {
  protected baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `http://localhost:3001/recipes`;
  }

  public async appendToRecipe(entry: RecipeEntry) {
    await axios.post(this.baseUrl, entry).catch(this.handleError);
  }

  public async updateRecipe(entry: RecipeEntry) {
    await axios.put(this.baseUrl, entry).catch(this.handleError);
  }

  public async removeFromRecipe({
    productId,
    materialId,
  }: Omit<RecipeEntry, 'quantity'>) {
    await axios
      .delete(`${this.baseUrl}/${productId}/${materialId}`)
      .catch(this.handleError);
  }
}

const recipeService = new RecipeService();
export default recipeService;
