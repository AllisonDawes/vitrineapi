import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Expose } from "class-transformer";

@Entity("category_products")
class CategoryProducts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("boolean")
  active: boolean;

  @Column()
  category_products_img: string;

  @Expose({ name: "category_products_img" })
  getImg_url(): string | null {
    return this.category_products_img
      ? `${process.env.CATEGORY_PRODUCT_IMG}/files/${this.category_products_img}`
      : null;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CategoryProducts;
