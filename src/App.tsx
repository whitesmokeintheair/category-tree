import { CategoryTree } from './components/CategoryTree';
import './App.css';
import { Category } from './types';

const defaultCategories: Category[] = [
	{
		id: 1,
		name: 'Category 1',
		children: [
			{
				id: 2,
				name: 'Sub',
				children: [
					{
						id: 4,
						name: 'SubSub',
						children: [],
					},
				],
			},
		],
	},
	{
		id: 3,
		name: 'Category 2',
		children: [],
	},
];

function App() {
	return (
		<div className='App-container'>
			<CategoryTree categories={defaultCategories}></CategoryTree>
		</div>
	);
}

export default App;
