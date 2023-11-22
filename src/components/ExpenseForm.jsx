import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import categories from './categories';

const schema = z.object({
    description: z.string().min(3, {message: "Description should be at least 3 characters long"}).max(500),
    amount: z.number({invalid_type_error: 'Amount Field is require'}).min(0.01).max(100_00),
    category: z.enum(categories, {
      errorMap: () => ({message: 'Category is required' })
    })
});

const ExpenseForm = ({onSubmit}) => {
  const {register, handleSubmit, reset, formState: { errors }} = useForm({resolver: zodResolver(schema)});
  const onSubmitHandler = (data) => {
    onSubmit(data);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input {...register("description")} id="description" type="text" className="form-control" />
            {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>

        <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input {...register('amount', {valueAsNumber: true})} id="amount" type="number" className="form-control" />
            {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
        </div>

        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select {...register('category')} className="form-select" id="category">
                <option value=""></option>
                {categories.map((cat)=><option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category &&  <p className="text-danger">{errors.category.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default ExpenseForm;
