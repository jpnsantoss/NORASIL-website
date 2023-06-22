"use client";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const UsersForm = () => {
  return (
    <div className="flex space-x-2">
      <Input type="email" placeholder="Email" />
      <Button className="shrink-0">Add</Button>
    </div>
  );
};

export default UsersForm;
