import { CreateShoppingListDto, ShoppingListModel } from "./shoppingListApi";

class ShoppingListCache {
  private static instance: ShoppingListCache;
  private shoppingLists: ShoppingListModel[];

  private constructor() {
    this.shoppingLists = [
    ];
  }

  static getInstance(): ShoppingListCache {
    if (!ShoppingListCache.instance) {
      ShoppingListCache.instance = new ShoppingListCache();
    }
    return ShoppingListCache.instance;
  }

  get(): ShoppingListModel[] {
    return this.shoppingLists;
  }

  add(shoppingList: CreateShoppingListDto): ShoppingListModel {
    const id = "list-" + Math.floor(Math.random() * 100);
    const newList = {
      id: id,
      name: shoppingList.name,
      completed: false,
      collaborators: shoppingList.collaborators,
      lastUpdate: Date.now()
    }
    this.shoppingLists.push(newList);

    return newList;
  }

  remove(id: string): void {
    const index = this.shoppingLists.findIndex((x) => x.id === id);
    if (index > -1) {
      this.shoppingLists.splice(index, 1);
    }
  }
}

export default ShoppingListCache;