import { useState } from 'react';
import { Category } from '../types';
import { AddItem } from './AddItem';
import { EditItem } from './EditItem';
import '../App.css';

type CategoryItemProps = {
	category: Category;
	onAdd: (categoryName: string, parentId?: number) => void;
	onEdit: (parentId: number, newName: string) => void;
	onDelete: (categoryId: number) => void;
};

const renderExpandIndicator = (isExpanded: boolean, hasChildren: boolean) => {
	if (!hasChildren) return '';
	if (isExpanded) return '-';
	return '+';
};

export const CategoryItem = ({
	category,
	onAdd,
	onEdit,
	onDelete,
}: CategoryItemProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isExpanded, setIsExpanded] = useState(true);

	const handleAddClick = (value: boolean) => () => {
		setIsAdding(value);
	};

	const handleEditClick = (value: boolean) => () => setIsEditing(value);

	const handleExpandClick = () => {
		if (category.children?.length > 0) {
			setIsExpanded((prev) => !prev);
		}
	};

	return (
		<>
			<div className='CategoryItem-container'>
				{isEditing ? (
					<EditItem
						categoryName={category.name}
						categoryId={category.id}
						toggleEditMode={handleEditClick}
						onEdit={onEdit}
					></EditItem>
				) : (
					<div className='CategoryItem-content'>
						<div onClick={handleExpandClick}>
							<span className='CategoryItem-expand-indicator'>
								{renderExpandIndicator(
									isExpanded,
									category.children?.length > 0
								)}
							</span>
							<span>{category.name}</span>
						</div>
						<div className='CategoryItem-actions'>
							<button onClick={handleAddClick(true)}>+</button>
							<button onClick={handleEditClick(true)}>Edit</button>
							<button onClick={() => onDelete(category.id)}>Delete</button>
						</div>
					</div>
				)}

				{isAdding && (
					<AddItem
						toggleIsAdding={handleAddClick}
						onAdd={onAdd}
						parentCategoryId={category.id}
					></AddItem>
				)}

				{isExpanded && category.children?.length > 0 && (
					<div>
						{category.children.map((child) => (
							<CategoryItem
								key={child.id}
								category={child}
								onAdd={onAdd}
								onEdit={onEdit}
								onDelete={onDelete}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
};
