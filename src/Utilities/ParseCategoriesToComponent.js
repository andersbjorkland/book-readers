let categoryKey = 0;

const ParseCategoriesToComponent = (categoriesArray, maxItems = -1) => {
    let cats = [];
    if (categoriesArray) {
        if (maxItems > 0) {
            for (let i = 0; i < (maxItems <= categoriesArray.length ? maxItems : categoriesArray.length); i++) {
                cats.push(<p key={i}>{categoriesArray[i]}</p>);
            }
        } else {
            cats = categoriesArray.map(category => <p key={categoryKey++}>{category}</p>);
        }
    } else {
        cats = <p>Not specified</p>;
    }

    return (
        <div className="item-footer">{cats}</div>
    );
};

export default ParseCategoriesToComponent;