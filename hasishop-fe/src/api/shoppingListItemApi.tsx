import { ApiService } from './apiService';

export class ShoppingListItemApi {
  private apiService: ApiService;

  constructor(baseURL: string) {
    this.apiService = new ApiService(baseURL);
  }

  async fetchShoppingListItems(shoppingListId: string): Promise<ShoppingListItemModel[]> {
    const data = [
      {
        "id": "item-001",
        "name": "Chicken Breast",
        "active": true,
        "category": ShoppingItemCategory.Meat,
        "note": "Boneless, skinless"
      },
      {
        "id": "item-002",
        "name": "Apples",
        "active": false,
        "category": ShoppingItemCategory.Fruit,
        "note": "Big red ones"
      },
      {
        "id": "item-003",
        "name": "Potatoes",
        "active": false,
        "category": ShoppingItemCategory.Other,
        "note": "For mashed potatoes"
      },
      {
        "id": "item-004",
        "name": "Chips",
        "active": true,
        "category": ShoppingItemCategory.Snacks,
        "note": "Family pack"
      }
    ];

    return data;

    return this.apiService.get<ShoppingListItemModel[]>(`/shoppinglist/${shoppingListId}/items`);
  }

  async createShoppingListItem(shoppingListId: string, data: CreateShoppingListItemDto): Promise<ShoppingListItemModel> {
    return this.apiService.post<ShoppingListItemModel, CreateShoppingListItemDto>(`/shoppinglist/${shoppingListId}/items`, data);
  }

  async updateShoppingListItem(shoppingListId: string, shoppingItemId: string, data: UpdateShoppingListItemDto): Promise<ShoppingListItemModel> {
    return this.apiService.put<ShoppingListItemModel, UpdateShoppingListItemDto>(`/shoppinglist/${shoppingListId}/items/${shoppingItemId}`, data);
  }

  async deleteShoppingListItem(shoppingListId: string, shoppingItemId: string,): Promise<void> {
    return this.apiService.delete<void>(`/shoppinglist/${shoppingListId}/items/${shoppingItemId}`);
  }
}

export interface ShoppingListItemModel {
  id: string;
  name: string;
  active: boolean;
  category?: ShoppingItemCategory;
  note?: string;
}

export enum ShoppingItemCategory {
  Meat = "Meat",
  Fruit = "Fruit",
  Vegetables = "Vegetables",
  Snacks = "Snacks",
  Other = "Other"
}

export interface CreateShoppingListItemDto {
  name: string;
}

export interface UpdateShoppingListItemDto {
  id: string;
  name: string;
}
