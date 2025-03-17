import { useState } from 'react';

type EditItemProps = {
	categoryName: string;
	categoryId: number;
	toggleEditMode: (value: boolean) => void;
	onEdit: (parentId: number, newName: string) => void;
};

export const EditItem = ({
	categoryName,
	categoryId,
	toggleEditMode,
	onEdit,
}: EditItemProps) => {
	const [editedName, setEditedName] = useState(categoryName);

	const handleSaveEdit = () => {
		if (editedName.trim()) {
			onEdit(categoryId, editedName);
			toggleEditMode(false);
		}
	};
	return (
		<div>
			<input
				type='text'
				value={editedName}
				onChange={(e) => setEditedName(e.target.value)}
			/>
			<button onClick={handleSaveEdit}>Save</button>
			<button onClick={() => toggleEditMode(false)}>Cancel</button>
		</div>
	);
};
