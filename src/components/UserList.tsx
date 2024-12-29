import React, { useState } from "react";
import { User } from "../types/user";
import Accordion from "./Accordion";
import EditUserForm from "./EditUserForm";
import DeleteDialog from "./DeleteDialog";

interface UserListProps {
  users: User[];
  searchText: string;
  onEdit: (updatedUser: User) => void;
  onDelete: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  searchText,
  onEdit,
  onDelete,
}) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    if (editId !== null) return; // Prevent toggling during edit
    setOpenId(openId === id ? null : id);
  };

  const confirmDelete = () => {
    if (deleteUserId !== null) {
      onDelete(deleteUserId);
      setDeleteUserId(null); // Close the dialog
    }
  };

  const filteredUsers = (users || []).filter((user) =>
    user.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!filteredUsers.length) return <p>No Users Found</p>;

  return (
    <div>
      {filteredUsers.map((user) => (
        <Accordion
          key={user.id}
          name={user.name}
          isOpen={openId === user.id}
          onClick={() => handleToggle(user.id)}
          picture={user.picture}
        >
          {editId === user.id ? (
            <EditUserForm
              user={user}
              onSave={(updatedUser) => {
                onEdit(updatedUser);
                setEditId(null);
              }}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <div>
              <div className="flex justify-between">
                <p className="w-[28%] flex flex-col">
                  <span className="text-gray-600">Age</span>
                  <span className="font-semibold">{user.age} Years</span>
                </p>
                <p className="w-[28%] flex flex-col">
                  <span className="text-gray-600">Gender</span>
                  <span className="font-semibold">{user.gender}</span>
                </p>
                <p className="w-[28%] flex flex-col">
                  <span className="text-gray-600">Country</span>
                  <span className="font-semibold">{user.country}</span>
                </p>
              </div>
              <p className="flex flex-col my-[10px]">
                <span>Description</span>
                <span className="font-medium">{user.description}</span>
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className=""
                  onClick={() => setDeleteUserId(user.id)}
                >
                  🗑️
                </button>
                <button
                  className=""
                  onClick={() => setEditId(user.id)}
                >
                  ✏️
                </button>
              </div>
            </div>
          )}
        </Accordion>
      ))}

      {deleteUserId !== null && (
        <DeleteDialog
          isOpen={true}
          onClose={() => setDeleteUserId(null)}
          onConfirm={confirmDelete}
          userName={
            users.find((user) => user.id === deleteUserId)?.name ?? "this user"
          }
        />
      )}
    </div>
  );
};

export default UserList;