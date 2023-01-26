import axios from 'axios';
import ApiService from './api.service';
import { type RecipeEntry } from '../types/recipes.types';
import { type CreateUpdateResponse } from '../types/response.types';

class RecipeService extends ApiService {
  protected baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `http://localhost:3001/recipes`;
  }

  public async appendToRecipe(
    entry: RecipeEntry,
  ): Promise<CreateUpdateResponse<RecipeEntry>> {
    return axios.post(this.baseUrl, entry).catch(this.handleError);
  }

  public async updateRecipe(
    entry: RecipeEntry,
  ): Promise<CreateUpdateResponse<RecipeEntry>> {
    return axios.put(this.baseUrl, entry).catch(this.handleError);
  }

  public async removeFromRecipe({
    productId,
    materialId,
  }: Omit<RecipeEntry, 'quantity'>): Promise<
    CreateUpdateResponse<RecipeEntry>
  > {
    return axios
      .delete(`${this.baseUrl}/${productId}/${materialId}`)
      .catch(this.handleError);
  }
}

const recipeService = new RecipeService();
export default recipeService;
