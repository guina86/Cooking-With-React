import { useContext } from 'react'
import { RecipeContext } from './App'
import { v4 as uuid } from 'uuid'
import RecipeIngredientEdit from './RecipeIngredientEdit'

export default function RecipeEdit({ recipe }) {
    const { id, name, servings, cookTime, instructions, ingredients } = recipe
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

    function handleChange(changes) {
        handleRecipeChange(id, {...recipe, ...changes})
    }

    function handleIngredientChange(id, newIngredient) {
        const newIngredients = ingredients.map(ingredient => ingredient.id === id ? newIngredient : ingredient)
        handleChange({ingredients : newIngredients})
    }

    function handleIngredientAdd() {
        const newIngredient = {
            id: uuid(),
            name: '',
            amount: ''
        }
        handleChange({ingredients: [...ingredients, newIngredient]})
    }

    function handleIngredientDelete(id) {
        handleChange({ingredients: ingredients.filter(ingredient => ingredient.id !== id)})
    }

    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-button-container">
                <button className="btn recipe-edit__remove-button" onClick={() => handleRecipeSelect(undefined) }>&times;</button>
            </div>
            <div className="recipe-edit__details-grid">
                <label className="recipe-edit__label" htmlFor="name">Name</label>
                <input className="recipe-edit__input" type="text" name="name" id="name" value={name} onInput={ e => handleChange({name: e.target.value})}/>
                <label className="recipe-edit__label" htmlFor="cookTime">Cook Time</label>
                <input className="recipe-edit__input" type="text" name="cookTime" id="cookTime" value={cookTime}  onInput={ e => handleChange({cookTime: e.target.value})}/>
                <label className="recipe-edit__label" htmlFor="servings">Servings</label>
                <input className="recipe-edit__input" type="number" name="servings" id="servings" value={servings}  onInput={ e => handleChange({servings: parseInt(e.target.value) || ''})}/>
                <label className="recipe-edit__label" htmlFor="instructions">Instructions</label>
                <textarea className="recipe-edit__input" name="instructions" id="instructions" value={instructions}  onInput={ e => handleChange({instructions: e.target.value})}></textarea>
            </div>
            <br />
            <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {ingredients.map(ingredient => <RecipeIngredientEdit
                    key={ingredient.id}
                    handleIngredientChange={handleIngredientChange}
                    handleIngredientDelete={handleIngredientDelete}
                    ingredient={ingredient} />)}
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button className="btn btn--primary" onClick={() => handleIngredientAdd()}>Add Ingredient</button>
            </div>
        </div>
    )
}
