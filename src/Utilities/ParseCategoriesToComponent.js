let categoryKey = 0;

const ParseCategoriesToComponent = (categoriesArray) => (
    categoriesArray ? <div className="item-footer">{categoriesArray.map(category => <p key={categoryKey++}>{category}</p>)}</div> : <p>Not specified</p>
);

export default ParseCategoriesToComponent;