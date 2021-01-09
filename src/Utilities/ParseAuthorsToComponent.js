const AuthorsParser = (authorsArray) => {
    let authorKey = 0;
    let upperLimit = authorsArray ? authorsArray.length : 0;
    upperLimit = upperLimit > 3 ? 3 : upperLimit;
    const authors = [];

    
    for (let i = 0; i < upperLimit; i++) {
        let binder = "";
        if (i === upperLimit - 2) {
            binder = " & ";
        }

        if (upperLimit !== 2 && i < upperLimit - 1) {
            binder = ", ";
        }

        authors.push(
            <span key={authorKey++}>
                {semiAbbreviateName(authorsArray[i]) + binder}
            </span>
        );

        if (i + 1 === upperLimit) {
            if (authorsArray.length > upperLimit) {
                authors.push(
                    <span key={authorKey++}>
                        {" and others"}
                    </span>
                )
            }
        }
    }

    return (
        <div className="flex-row">
            <p>
                {authors}
            </p>
        </div>
    );
}

const semiAbbreviateName = (name) => {
    let abbreviatedName = "";
    const nameElements = name.split(' ');
    for (let i = 0; i < nameElements.length; i++) {
        if (i === nameElements.length - 1) {
            abbreviatedName += nameElements[i];
        } else {
            abbreviatedName += nameElements[i].charAt(0) + ".\u00A0"; // hard-space is used
        }
    }
  
    return abbreviatedName;
  }

export default AuthorsParser;