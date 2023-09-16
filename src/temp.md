## 目录变动

app/controllers
- application_controller.rb

app/controllers/api/v1
- items_controller.rb
- tags_controller.rb

app/models
- item.rb
- session.rb
- tag.rb

app/mailers
- application_mailer.rb

bin
- pack_for_remote.sh
- setup_remote.sh

config
- application.rb
- nginx.default.conf

config/initializers
- cors.rb

config/environments
- development.rb
- production.rb

spec
- spec_helper.rb

spec/accptance
- items_spec.rb

spec/request/api/v1
- items_spec.rb
- me_spec.rb
- session_spec.rb
- validation_codes_spec.rb

lib
- auto_jwt.rb


## db

db/migrate/...rename_happen_...

```
RenameHappenAtForItems
```

db/schema.rb deff

node_modules ???