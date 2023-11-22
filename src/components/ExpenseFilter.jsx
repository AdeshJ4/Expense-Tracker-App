import categories from './categories'

const ExpenseFilter = ({onSelectCategory}) => {
  return (
    <select className="form-select" onChange={(e)=>onSelectCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(cat=><option value={cat} key={cat}>{cat}</option>)}
    </select>
  )
}

export default ExpenseFilter