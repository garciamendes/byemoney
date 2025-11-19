"use client";

import { Option } from "@/components/select";
import { http } from "@/shared/apiHttp/http";
import { ICategoriesReponse } from "@/shared/types";
import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await http.get<{ categories: ICategoriesReponse[] }>(
          "/api/categories"
        );

        const options: Option[] = [];
        data.categories.forEach((category) => {
          options.push({
            label: category.name,
            value: category.id,
          });
        });

        setCategories(options);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return { categories, loading };
}
