const Fs = require('fs')
const Path = require('path')
const Sass = require('sass')

const getComponents = ()=>{
    let allComponents = []

    const types = ['atoms', 'molecules', 'organisms']
    types.forEach(type=>{
        const allFiles = Fs.readdirSync(`src/${type}`).map(file=>({
            input: `src/${type}/${file}`,
            output: `lib/${file.slice(0,-4)}css`
        }))
        allComponents = [
            ...allComponents,
            ...allFiles
        ]
    })

    return allComponents
}

const compile = (path, fileName) => {
    // const result = Sass.render({
    //     data: Fs.readFileSync(
    //         Path.resolve(path)
    //     ).toString(),
    //     outputStyle: 'expanded',
    //     includePaths: [Path.resolve('src')]  //参数用于指定Sass查找导入文件（@import）时的附加目录
    // })

    const result = Sass.compile(Path.resolve(path), {
        loadPaths: [Path.resolve('src'), Path.resolve('')],
        style: "expanded"
    })

    Fs.writeFileSync(
        Path.resolve(fileName),
        result.css.toString()
    )
}

compile('src/global.scss', 'lib/global.css')
// console.log(getComponents())

getComponents().forEach(component => {
    compile(component.input, component.output)
})