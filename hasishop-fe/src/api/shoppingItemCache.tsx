import { CreateShoppingListItemDto, ShoppingListItemModel, UpdateShoppingListItemDto } from "./shoppingListItemApi";

class ShoppingItemCache {
  private static instance: ShoppingItemCache;
  private shoppingItemMap: Map<string, ShoppingListItemModel[]>;

  private constructor() {
    this.shoppingItemMap = new Map<string, ShoppingListItemModel[]>;
  }

  static getInstance(): ShoppingItemCache {
    if (!ShoppingItemCache.instance) {
      ShoppingItemCache.instance = new ShoppingItemCache();
    }
    return ShoppingItemCache.instance;
  }

  get(id: string): ShoppingListItemModel[] {
    const items = this.shoppingItemMap.get(id);
    return items ? items : new Array<ShoppingListItemModel>();
  }

  add(shoppingListItem: CreateShoppingListItemDto): ShoppingListItemModel {
    if(!this.shoppingItemMap.get(shoppingListItem.shoppingListId)) {
      this.shoppingItemMap.set(shoppingListItem.shoppingListId, [])
    }

    const item = {
      id: "item-" + Math.floor(Math.random() * 100),
      name: shoppingListItem.name,
      active: false,
      category: shoppingListItem.category,
      note: shoppingListItem.note ? shoppingListItem.note : ''
    }

    const items = this.shoppingItemMap.get(shoppingListItem.shoppingListId)!;
    const newMap = new Map(this.shoppingItemMap);
    const updatedItems = [...items, item];
    newMap.set(shoppingListItem.shoppingListId, updatedItems);
    this.shoppingItemMap = newMap;

    return item;
  }

  update(dto: UpdateShoppingListItemDto): ShoppingListItemModel {
    if(!this.shoppingItemMap.get(dto.shoppingListId)) {
      this.shoppingItemMap.set(dto.shoppingListId, [])
    }

    const items = this.shoppingItemMap.get(dto.shoppingListId);
    const item = items?.find(x => x.id === dto.shoppingListItemId);

    if(item) {
      item.name = dto.name ?? item.name;
      item.active = dto.active ?? item.active;
      item.category = dto.category ?? item.category;
      item.note = dto.note ?? item.note;
    } else {
      throw new Error(`Could not find item: ${dto.shoppingListItemId} in ${dto.shoppingListId}`);
    }
    
    return item ?? null;
  }


  remove(id: string, shoppingListItem: ShoppingListItemModel): void {
    const items = this.shoppingItemMap.get(id);
    const index = items?.indexOf(shoppingListItem);
    if (index && index > -1) {
      items?.splice(index, 1);
    }
  }
}

export default ShoppingItemCache;