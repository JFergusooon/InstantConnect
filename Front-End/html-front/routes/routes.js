exports.index = (req, res) => {
    res.render('index', {
        title: 'Homescreen'
    });
};

exports.trending = (req, res) => {
    res.render('trending', {
        title: 'Trending Posts'
    });
}

exports.findpeople = (req, res) => {
    res.render('findpeople', {
        title: 'Find People'
    });
}
exports.privateAccount = (req, res) => {
    res.render('private_account', {
        title: 'My Page'
    });
}

exports.publicAccount = (req, res) => {
    res.render('public_account', {
        title: "Other's Page"
    });
}

exports.friendConfirm = (req, res) => {
    res.render('friendConfirm', {
        title: "Confirmation"
    })
}