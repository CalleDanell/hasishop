import { ApiService } from './apiService';

export class ShoppingListApi {
  private apiService: ApiService;

  constructor(baseURL: string) {
    this.apiService = new ApiService(baseURL);
  }

  async fetchShoppingLists(): Promise<ShoppingListModel[]> {
    const data = [
        {
          "id": "list-001",
          "name": "Weekly Groceries",
          "completed": false
        },
        {
          "id": "list-002",
          "name": "Party Supplies",
          "completed": false
        }
      ];
    return data;
      

    return this.apiService.get<ShoppingListModel[]>('/shoppinglists');
  }

  async fetchShoppingList(id: string): Promise<ShoppingListModel> {
    return this.apiService.get<ShoppingListModel>(`/shoppinglists/${id}`);
  }

  async createShoppingList(data: CreateShoppingListDto): Promise<ShoppingListModel> {
    return this.apiService.post<ShoppingListModel, CreateShoppingListDto>('/shoppinglists', data);
  }

  async updateShoppingList(id: string, data: UpdateShoppingListDto): Promise<ShoppingListModel> {
    return this.apiService.put<ShoppingListModel, UpdateShoppingListDto>(`/shoppinglists/${id}`, data);
  }

  async deleteShoppingList(id: string): Promise<void> {
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
}

export interface UpdateShoppingListDto {
    id: string;
    name: string;
}
