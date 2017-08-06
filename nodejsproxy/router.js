exports.router = (handle, pathname, req, res) => {
	typeof handle[pathname] === 'function' ? handle[pathname](req, res) : console.log('no request handlers')
}