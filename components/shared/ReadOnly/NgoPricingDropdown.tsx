"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useEffect, useState } from "react";

import { getAllNgoPricing } from "@/lib/actions/pricingNgo.actions";
import { IPricingNgo } from "@/lib/database/models/pricingNgo.model";

type DropdownProps = {
  value?: string; //optional
  onChangeHandler?: () => void; //optional and is a function that returns nothing
};

const NgoPricingDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<IPricingNgo[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllNgoPricing();

      categoryList && setCategories(categoryList as IPricingNgo[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.pageType}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default NgoPricingDropdown;
