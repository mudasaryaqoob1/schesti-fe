type Category = {
  label: string;
  value: string;
};

type SubCategory = {
  categoryId: string;
} & Category;

export type IWBSType = {
  title: string;
  category: Category;
  subCategory: SubCategory;
  scopeItems: []
};
