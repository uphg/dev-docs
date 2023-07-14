# 确保脚本抛出遇到的错误
set -e

# 删除之前的文件
rm -rf .vitepress/dist/

# 生成静态文件
pnpm docs:build

# 进入生成的文件夹
cd .vitepress/dist/

# 如果是发布到自定义域名
# echo 'uphgs.com' > CNAME &&

echo '# Git push'

git init
git add -A
git commit -m 'update'

git push -f git@github.com:uphg/dev-docs.git master:gh-pages
# git push -f git@gitee.com:uphg/dev-docs.git master:gh-pages

rm -rf .git

cd -