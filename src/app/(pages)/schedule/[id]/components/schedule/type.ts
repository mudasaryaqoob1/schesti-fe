type Category = {
    label: string;
    value: string;
}

type SubCategory = {
    categoryId: string;
} & Category



export type IWBSType = {
    category: Category;
    subCategory: SubCategory;
} 