class FlowPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap('FlowPlugin', (context, entry) => {
      // entry 配置被 webpack 处理好之后触发
      // console.log(`entryOption: ${entry}`);
    });

    compiler.hooks.beforeRun.tap('FlowPlugin', (compiler) => {
      // compiler 执行之前触发
      // 可以从参数 compiler 读取到执行前的整个编译器状态
      // console.log(compiler.options.plugins);
    });

    compiler.hooks.compilation.tap('FlowPlugin', (compilation) => {
      // 构建需要的 compilation 对象创建之后，可以从参数获取 compilation 读取到该次构建的基础状态
      // 通常 compilation 的 hooks 绑定一般也在该阶段处理
      // console.log(compilation);

      compilation.hooks.buildModule.tap('FlowPlugin', (module) => {
        // 一个模块开始构建之前，可以用于修改模块信息
        // 模块代码内容的转换依旧是应该 loader 来处理，plugin 着眼于其他信息的调整或获取
        // console.log(module);
      });

      compilation.hooks.finishModules.tap('FlowPlugin', (modules) => {
        // 所有模块都被成功构建时执行，可以获取所有模块的相关信息
        // console.log(modules);
      });

      compilation.hooks.chunkAsset.tap('FlowPlugin', (chunk, filename) => {
        // chunk 对应的一个输出资源添加到 compilation 时执行，可以获取 chunk 对应输出内容信息
        // module 也有 moduleAsset，但实际使用 chunk 会更多
        // console.log(chunk, '\n', filename);
      });
    });

    compiler.hooks.make.tap('FlowPlugin', (compilation) => {
      // compilation 完成编译后执行，可以从参数查看 compilation 完成一次编译后的状态
      // console.log(compilation);
    });

    compiler.hooks.shouldEmit.tap('FlowPlugin', (compilation) => {
      // 在输出构建结果前执行，可以通过该 hook 返回 true/false 来控制是否输出对应的构建结果
      return true;
    });

    compiler.hooks.assetEmitted.tap(
      'FlowPlugin',
      (file, content) => {
        // 在构建结果输出之后执行，可以获取输出内容的相关信息
        // console.log(content);
      }
    );

    compiler.hooks.done.tap('FlowPlugin', (stats) => {
      // 完成一次构建后执行，可以输出构建执行结果信息
      // console.log(stats);
    });

    compiler.hooks.failed.tap('FlowPlugin', (error) => {
      // 构建失败时执行，用于获取异常进行处理
      // console.log(error);
    });
  }
}

module.exports = FlowPlugin;
