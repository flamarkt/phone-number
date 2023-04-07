<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->string('flamarkt_phone_number')->nullable()->index();
        });
    },
    'down' => function (Builder $schema) {
        if (!$schema->hasColumn('users', 'flamarkt_phone_number')) {
            return;
        }

        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('flamarkt_phone_number');
        });
    },
];
