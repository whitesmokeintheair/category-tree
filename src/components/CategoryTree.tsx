import { useState } from 'react';
import { Category } from '../types';
import { CategoryItem } from './CategoryItem';
import '../App.css';

type CategoryTreeProps = {
	categories: Category[];
};

export const CategoryTree = ({
	categories: defaultCategories,
}: CategoryTreeProps) => {
	const [categories, setCategories] = useState(defaultCategories);
	const [newRootCategoryName, setNewRootCategoryName] = useState('');

	const addCategory = (categoryName: string, parentId?: number) => {
		const newCategory = {
			id: Date.now(),
			name: categoryName,
			children: [],
		};

		if (!parentId) {
			setCategories([...categories, newCategory]);
			return;
		}

		const addToTree = (nodes: Category[]): Category[] => {
			return nodes.map((node) => {
				if (node.id === parentId) {
					return { ...node, children: [...node.children, newCategory] };
				}
				return { ...node, children: addToTree(node.children) };
			});
		};

		setCategories(addToTree(categories));
	};

	const editCategory = (categoryId: number, newName: string) => {
		const updateTree = (nodes: Category[]): Category[] => {
			return nodes.map((node) => {
				if (node.id === categoryId) {
					return { ...node, name: newName };
				}
				return { ...node, children: updateTree(node.children) };
			});
		};

		setCategories(updateTree(categories));
	};

	const deleteCategory = (categoryId: number) => {
		const removeFromTree = (nodes: Category[]): Category[] => {
			return nodes
				.filter((node) => node.id !== categoryId)
				.map((node) => ({ ...node, children: removeFromTree(node.children) }));
		};

		setCategories(removeFromTree(categories));
	};

	const handleAddRootCategory = () => {
		if (newRootCategoryName.trim().length > 0) {
			addCategory(newRootCategoryName);
			setNewRootCategoryName('');
		}
	};
	return (
		<div className='CategoryTree-container'>
			<div>
				<input
					className='CategoryTree-input'
					type='text'
					maxLength={20}
					value={newRootCategoryName}
					onChange={(e) => setNewRootCategoryName(e.target.value)}
					placeholder='Enter root category name'
				/>
				<button
					className='CategoryTree-button'
					onClick={handleAddRootCategory}
				>
					+
				</button>
			</div>
			{categories.map((category) => (
				<CategoryItem
					key={category.id}
					category={category}
					onAdd={addCategory}
					onEdit={editCategory}
					onDelete={deleteCategory}
				/>
			))}
		</div>
	);
};
