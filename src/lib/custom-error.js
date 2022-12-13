const customError = ({name, message}) => {
	const err = new Error(message)
	err.name =  name
	console.log(err, 'mmmmmmmmmmmmmmmmmmmmmmmmmmm')
	return err
}

module.exports = customError