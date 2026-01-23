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
php yii migrate/create test_migration --migrationPath=@app/vendor/uims/health/src/modules/health/migrations                        // HEALTH
php yii migrate/up --migrationPath=@app/vendor/uims/health/src/modules/health/migrations --migrationTable=health_migration_history // HEALTH

php yii migrate/create test_migration --migrationPath=@app/vendor/uims/estate/src/modules/estate/migrations                        // ESTATE
php yii migrate/up --migrationPath=@app/vendor/uims/estate/src/modules/estate/migrations --migrationTable=estate_migration_history // ESTATE

php yii migrate/create test_migration --migrationPath=@app/vendor/uims/ehousing/src/modules/ehousing/migrations                    // EHOUSING
php yii migrate/up --migrationPath=@app/vendor/uims/ehousing/src/modules/ehousing/migrations --migrationTable=ehousing_migration_history                                                                                        // EHOUSING
```

# CRUD Generator

```bash
model uims\health\src\modules\health\models\HealthReferralLetterTemplate
searchModel uims\health\src\modules\health\models\search\HealthReferralLetterTemplateSearch
controller uims\health\src\modules\health\controllers\HealthReferralLetterTemplateController
view @app/vendor/uims/health/src/modules/health/views/health-referral-letter-template

model uims\estate\src\modules\estate\models\EstateBuildingStatus
searchModel uims\estate\src\modules\estate\models\search\EstateBuildingStatusSearch
controller uims\estate\src\modules\estate\controllers\EstateBuildingStatusController
view @app/vendor/uims/estate/src/modules/estate/views/estate-maintenance-assignment
```

# Virtual Box

```bash
sudo VBoxManage internalcommands createrawvmdk -filename ~/backup.vmdk -rawdisk /dev/sda
sudo VBoxManage closemedium disk ~/backup.vmdk --delete
sudo mount -t vboxsf <foldername> /mnt/shared
sudo btrfs property set -f /mnt ro false // To mount btrfs subvolume as read and write mode
```
