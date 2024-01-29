import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { categoriesService } from '@/app/services/categories.service';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import CustomModal from '@/app/component/modal';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { CloseOutlined } from '@ant-design/icons';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { IWBSType } from './type';

type Props = {
  setMaterialModal: Dispatch<SetStateAction<boolean>>;
  materialModal: boolean;
  handleWbs(
    _category: IWBSType['category'],
    _subCategory: IWBSType['subCategory']
  ): void;
};
export function CategoryModal({
  materialModal,
  setMaterialModal,
  handleWbs,
}: Props) {
  const [categories, setCategories] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [subCategories, setSubCategories] = useState<
    {
      label: string;
      value: string;
      categoryId: string;
    }[]
  >([]);
  const [category, setCategory] = useState('');

  const [subCategory, setSubCategory] = useState('');

  const fetchCategories = useCallback(async () => {
    const result = await categoriesService.httpGetAllCategories(1, 9);
    let modifyCategories = result.data.map(
      (cat: { name: string; _id: string }) => {
        return {
          label: cat.name,
          value: cat._id,
        };
      }
    );
    setCategories(modifyCategories);
  }, []);

  const fetchSubCategories = useCallback(async () => {
    const result = await categoriesService.httpGetAllSubcategories(1, 9);
    const flattenedSubcategories: any[] = [];

    result.data.forEach((category: any) => {
      category.subcategories.forEach((subcategory: any) => {
        const flattenedSubcategory = {
          label: subcategory.name,
          value: subcategory._id,
          categoryId: subcategory.categoryId,
        };
        flattenedSubcategories.push(flattenedSubcategory);
      });
    });
    setSubCategories(flattenedSubcategories);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  function handleCreateWbs() {
    if (!category || !subCategory) {
      return;
    }
    const c = categories.find(
      (cat: { value: string }) => cat.value === category
    );
    const s = subCategories.find(
      (cat: { value: string }) => cat.value === subCategory
    );
    if (!c || !s) {
      return;
    }
    handleWbs(c, s);
    setMaterialModal(false);
  }

  return (
    <CustomModal setOpen={() => setMaterialModal(false)} open={materialModal}>
      <div className="rounded-lg z-50 bg-white">
        <div className="bg-[#D0D5DD]  p-2 border-[#D0D5DD] flex  py-2.5 justify-between">
          <TertiaryHeading
            title="Select Project WBS"
            className="text-graphiteGray"
          />
          <CloseOutlined
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={() => setMaterialModal(false)}
          />
        </div>
        <div className="p-2 space-y-3">
          <SelectComponent
            label="CSI Section"
            labelStyle="!text-[#464646] !text-base !font-normal"
            field={{
              options: categories,
              value: category,
              onChange: (e) => {
                setCategory(e);
              },
            }}
            name="category"
            placeholder="Select CSI Section"
          />
          <SelectComponent
            label="Title"
            labelStyle="!text-[#464646] !text-base !font-normal"
            field={{
              options: subCategories.filter(
                (cat: any) => cat.categoryId === category
              ),
              value: subCategory,
              onChange: (e) => {
                setSubCategory(e);
              },
            }}
            name="sub-category"
            placeholder="Select Title"
          />

          <div className="flex mt-3 justify-end py-2 space-x-2">
            <WhiteButton text="Cancel" className="!w-28" />
            <CustomButton
              text="Create"
              className="!w-28"
              onClick={handleCreateWbs}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
