type Item = {
    id: number;
    parent: number | string;
    type?: string | null;
};

interface TreeStoreI {
    items: Item[];
    sortedItems: Item[];
    getAll: () => Item[];
    getItem: (id: number) => Item;
    getChildren: (id: number | string) => Item[];
    getAllChildren: (id: number | string) => Item[];
    getAllParents: (id: number) => Item[];
}

class TreeStore implements TreeStoreI {
    items: Item[];
    sortedItems: Item[];

    constructor(items: Item[]) {
        this.items = items;
        this.sortedItems = items.sort((a: Item, b: Item) => a.id - b.id);
    }

    getAll(): Item[] {
        return this.items;
    }

    getItem(id: number): Item {
        return this.sortedItems[id - 1];
    }

    getChildren(id: number | string): Item[] {
        return this.items.filter((item) => item.parent === id);
    }

    getAllChildren(id: number | string): Item[] {
        const sortChildren: Item[] = this.getChildren(id);

        return sortChildren.reduce((result: Item[], current: Item) => {
            result.push(...this.getChildren(current.id));

            return result;
        }, sortChildren);
    }

    getAllParents(id: number, result: Item[] = []): Item[] {
        let item: Item = this.getItem(id);

        if (!item || item.parent === "root") return result;
        else {
            result.push(this.getItem(+item.parent));
            return this.getAllParents(+item.parent, result);
        }
    }
}

const items = [
    { id: 1, parent: "root" },
    { id: 2, parent: 1, type: "test" },
    { id: 3, parent: 1, type: "test" },

    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

export default ts;
