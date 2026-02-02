# Debugger

## PHP

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "port": 9003,
      "type": "php",
      "request": "launch",
      "name": "PHP Debugger"
    }
  ]
}
```

## NEXT

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "request": "launch",
      "command": "bun dev",
      "type": "node-terminal",
      "name": "NEXT Debugger"
    }
  ]
}
```

# Database

```bash
mysqldump -u your_username -p database_name table1 table2 table3 > selected_tables.sql
mariadb-dump --ssl=0 -u your_username -p database_name table1 table2 table3 > selected_tables.sql
mongoimport --uri "{uri}" --collection {collection} --file {file-location} --jsonArray
```

# Product Description

```bash
sudo cat /sys/class/dmi/id/product_serial
```

# Webstorm

```
rm -f ~/.var/app/com.jetbrains.WebStorm/config/JetBrains/WebStorm*/.lock && flatpak run com.jetbrains.WebStorm
```

# Git

```bash
git branch --unset-upstream // To remove the remote tracking branch

git status -sb // To check which remote branch is tracked by local branch

git rev-list --count HEAD // To count the number of commits in the current HEAD

git shortlog -s -n // Shows contributors each contributors with their commit count

git shortlog -s -n --author="Author Name" // To count the number of commits by Author Name

git shortlog -s -n --all // Shows contributors each contributors with their commit count in the whole repository

git shortlog -s -n branch_name // Shows contributors each contributors with their commit count in the specified branch

git commit --amend --no-edit --date="2025-01-01 14:30:00" // Change only the date of a commit
```

# Migrations

```bash
php yii migrate/create test_migration --migrationPath=@app/vendor/uims/ims/src/modules/ims/migrations                           // IMS
php yii migrate/up --migrationPath=@app/vendor/uims/ims/src/modules/ims/migrations --migrationTable=ims_migration_history       // IMS

php yii migrate/create test_migration --migrationPath=@app/vendor/uims/sports/src/modules/sports/migrations                           // Sports
php yii migrate/up --migrationPath=@app/vendor/uims/sports/src/modules/sports/migrations --migrationTable=sports_migration_history    // Sports

php yii migrate/create test_migration --migrationPath=@app/vendor/uims/document/src/modules/document/migrations                    // Document
php yii migrate/up --migrationPath=@app/vendor/uims/document/src/modules/document/migrations                   --migrationTable=document_migration_history                                                                                        // Document
```

# Yii CRUD Generator

```bash
model uims\ims\src\modules\ims\models\model
searchModel uims\ims\src\modules\ims\models\search\modelSearch
controller uims\ims\src\modules\ims\controllers\Controller
view @app/vendor/uims/ims/src/modules/ims/views/view
```

# Virtual Box

```bash
sudo VBoxManage internalcommands createrawvmdk -filename ~/backup.vmdk -rawdisk /dev/sda
sudo VBoxManage closemedium disk ~/backup.vmdk --delete
sudo mount -t vboxsf <foldername> /mnt/shared
sudo btrfs property set -f /mnt ro false // To mount btrfs subvolume as read and write mode
```
