import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column("boolean")
  admin: boolean;

  @Column("boolean")
  admin_secundary: boolean;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  admin_password: string;

  @Column()
  user_avatar: string;

  @Expose({ name: "user_avatar" })
  getAvatar_url(): string | null {
    return this.user_avatar
      ? `${process.env.AVATAR_URL}/files/${this.user_avatar}`
      : null;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
