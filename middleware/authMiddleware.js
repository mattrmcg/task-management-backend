const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    //hardcoded token for testing
    // const hardcodedKnownToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMzQwMzMxMiwiZXhwIjoxNzAzNDA2OTEyfQ.XN7-xWAuC18_vLecKMj7kucXZPUlV6C16UfxkdumkCE';
    // const token = `Bearer ${hardcodedKnownToken}`; // TEMP
    // const decodedToken = jwt.decode(hardcodedKnownToken); // TEMP
    // console.log(`DECODED TOKEN: ${JSON.stringify(decodedToken, null, 2)}`); // TEMP

    if (!token) {
        console.log("token doesn't exist");
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        //console.log(`JWT SECRET: ${process.env.JWT_SECRET}`);
        //console.log(`Token: ${token}`);
        const decoded = jwt.verify(token.replace('Bearer', '').trim(), process.env.JWT_SECRET);
        //console.log("token verified");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        //console.log("token couldn't verify");
        console.error(error);
        res.status(401).json({ error: 'Unauthorized '});
    }
};

module.exports = { authenticateUser };