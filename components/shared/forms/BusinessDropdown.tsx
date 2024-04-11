"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INgoCategory } from "@/lib/database/models/ngoCategories.model";
import { startTransition, useEffect, useState } from "react";

import { getAllBusinessPricing } from "@/lib/actions/pricingBusiness.actions";
import { IPricingBusiness } from "@/lib/database/models/pricingBusiness.model";

type DropdownProps = {
  value?: string; //optional
  onChangeHandler?: () => void; //optional and is a function that returns nothing
};

const BusinessDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<IPricingBusiness[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllBusinessPricing();

      categoryList && setCategories(categoryList as IPricingBusiness[]);
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

export default BusinessDropdown;
