all: dev
.PHONY: all

dev: dependencies
	@echo Building for development...
	@npm run dev
.PHONY: dev

prod: dependencies
	@echo Building for production...
	@npm run prod
.PHONY: prod

dependencies:
	@echo Installing npm packages...
	npm install
.PHONY: dependencies

deploy_prod: prod
	@echo Deploying to production...
	@test -s .deploypath || { echo ".deploypath doesn't exist!"; exit 1; }
	@echo `date +%FT%TZ`,`whoami`@`hostname`,`git config user.email`,`git rev-parse --abbrev-ref HEAD` > .last-deployment
	@rsync -rzv --delete --delete-excluded --exclude-from=.deployignore . onbrandserver.uberflip.com:/shared/`cat .deploypath`
.PHONY: deploy_prod

clean:
	@echo Cleaning up...
	git clean -xdf
.PHONY: clean
