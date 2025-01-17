import { ApiService } from './apiService';
import ShoppingListCache from './shoppingListCache';
import Cache from './shoppingListCache';

export class ShoppingListApi {
  private apiService: ApiService;
  private cache: ShoppingListCache;

  constructor(baseURL: string) {
    this.apiService = new ApiService(baseURL);
    this.cache = Cache.getInstance();
  }

  async fetchShoppingLists(): Promise<ShoppingListModel[]> {
    return this.cache.get();
    return this.apiService.get<ShoppingListModel[]>('/shoppinglists');
  }

  async createShoppingList(data: CreateShoppingListDto): Promise<ShoppingListModel> {
    return this.cache.add(data);
    return this.apiService.post<ShoppingListModel, CreateShoppingListDto>('/shoppinglists', data);
  }

  async updateShoppingList(id: string, data: UpdateShoppingListDto): Promise<ShoppingListModel> {
    return this.apiService.put<ShoppingListModel, UpdateShoppingListDto>(`/shoppinglists/${id}`, data);
  }

  async deleteShoppingList(id: string): Promise<void> {
    return this.cache.remove(id);
    return this.apiService.delete<void>(`/shoppinglists/${id}`);
  }
}

export interface ShoppingListModel {
  id: string;
  name: string;
  completed: boolean;
}

export interface CreateShoppingListDto {
  name: string;
  collaborators: string[];
}

export interface UpdateShoppingListDto {
  id: string;
  name: string;
}