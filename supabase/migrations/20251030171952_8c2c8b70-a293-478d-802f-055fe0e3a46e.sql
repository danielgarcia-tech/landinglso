-- Add new columns for the initial analysis form
ALTER TABLE public.consultas
ADD COLUMN IF NOT EXISTS es_autonomo boolean,
ADD COLUMN IF NOT EXISTS mas_dos_acreedores boolean,
ADD COLUMN IF NOT EXISTS acogido_lso_5_anos boolean,
ADD COLUMN IF NOT EXISTS condenado_10_anos boolean,
ADD COLUMN IF NOT EXISTS sancionado_10_anos boolean,
ADD COLUMN IF NOT EXISTS vivienda_propiedad boolean,
ADD COLUMN IF NOT EXISTS vehiculo_propiedad boolean,
ADD COLUMN IF NOT EXISTS vehiculo_pagado_completo boolean,
ADD COLUMN IF NOT EXISTS vehiculo_modelo text,
ADD COLUMN IF NOT EXISTS vehiculo_marca text,
ADD COLUMN IF NOT EXISTS vehiculo_ano_matriculacion text;