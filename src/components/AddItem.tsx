import { useState } from 'react';

type AddItemProps = {
	parentCategoryId: number;
	toggleIsAdding: (value: boolean) => void;
	onAdd: (categoryName: string, parentId?: number) => void;
};

export const AddItem = ({
	parentCategoryId,
	toggleIsAdding,
	onAdd,
}: AddItemProps) => {
	const [newCategoryName, setNewCategoryName] = useState('');

	const handleSubmit = () => {
		if (newCategoryName.trim()) {
			onAdd(newCategoryName, parentCategoryId);
			setNewCategoryName('');
			toggleIsAdding(false);
		}
	};

	return (
		<div>
			<input
				type='text'
				value={newCategoryName}
				onChange={(e) => setNewCategoryName(e.target.value)}
				placeholder='Enter category name'
			/>
			<button onClick={handleSubmit}>Submit</button>
			<button onClick={() => toggleIsAdding(false)}>Cancel</button>
		</div>
	);
};
