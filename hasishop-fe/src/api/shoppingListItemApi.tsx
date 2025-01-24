import { ApiService } from './apiService';
import ShoppingItemCache from './shoppingItemCache';

export class ShoppingListItemApi {
  private apiService: ApiService;
  private cache: ShoppingItemCache;

  constructor(baseURL: string) {
    this.apiService = new ApiService(baseURL);
    this.cache = ShoppingItemCache.getInstance();
  }

  async fetchShoppingListItems(shoppingListId: string): Promise<ShoppingListItemModel[]> {
    return this.cache.get(shoppingListId);

    return this.apiService.get<ShoppingListItemModel[]>(`/shoppinglist/${shoppingListId}/items`);
  }

  async createShoppingListItem(data: CreateShoppingListItemDto): Promise<ShoppingListItemModel> {
    
    return this.cache.add(data);
    
    return this.apiService.post<ShoppingListItemModel, CreateShoppingListItemDto>(`/shoppinglist/${data.shoppingListId}/items`, data);
  }

  async updateShoppingListItem(data: UpdateShoppingListItemDto): Promise<ShoppingListItemModel> {
    return this.cache.update(data);
    
    return this.apiService.put<ShoppingListItemModel, UpdateShoppingListItemDto>(`/shoppinglist/${shoppingListId}/items/${data.shoppingListItemId}`, data);
  }

  async deleteShoppingListItem(shoppingListId: string, shoppingItemId: string,): Promise<void> {
    return this.apiService.delete<void>(`/shoppinglist/${shoppingListId}/items/${shoppingItemId}`);
  }
}

export interface ShoppingListItemModel {
  id: string;
  name: string;
  active: boolean;
  category: ShoppingItemCategory;
  note?: string;
  lastUpdate: number;
}

export enum ShoppingItemCategory {
  Meat = "Meat",
  Fruit = "Fruit",
  Vegetables = "Vegetables",
  Snacks = "Snacks",
  Other = "Other"
}

export interface CreateShoppingListItemDto {
  shoppingListId: string;
  name: string;
  category: ShoppingItemCategory;
  active: boolean;
  note?: string;
}

export interface UpdateShoppingListItemDto {
  shoppingListId: string;
  shoppingListItemId: string;
  name?: string;
  category?: ShoppingItemCategory;
  active?: boolean;
  note?: string;
}
