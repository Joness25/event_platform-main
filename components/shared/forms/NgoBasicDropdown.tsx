import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INgoCategory } from "@/lib/database/models/ngoCategories.model";
import { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createNgoCategory,
  getAllNgoCategories,
} from "@/lib/actions/ngoCategories.actions";
import NgoForm from "./NgoForm";
import { useUser } from "@clerk/nextjs";

type DropdownProps = {
  value?: string; //optional
  onChangeHandler?: () => void; //optional and is a function that returns nothing
};

const NgoBasicDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const [categories, setCategories] = useState<INgoCategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createNgoCategory({
      categoryName: newCategory.trim(),
    }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllNgoCategories();

      categoryList && setCategories(categoryList as INgoCategory[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Ngo details" />
      </SelectTrigger>
      <SelectContent>
        {/* {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))} */}
        <Dialog>
          <DialogTrigger
            asChild
            className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500"
          >
            <Button variant="outline">Add new category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="">
              <NgoForm userId={userId} type="Create" />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </SelectContent>
    </Select>
  );
};

export default NgoBasicDropdown;
