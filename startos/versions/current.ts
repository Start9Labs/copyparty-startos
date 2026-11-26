import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.28:0',
  releaseNotes: {
    en_US: `Updated copyparty to 1.20.28.

**Security**

- Directory keys (the \`dk\` volume flag) no longer allow downloading from subfolders or other unintended access
- Users with read access over SFTP can no longer truncate files
- Fixed a cross-site request forgery issue and a cross-site scripting issue

None of these affect the configuration StartOS generates; they matter if you enabled directory keys or SFTP in your own config files.

**Fixes**

- Logging in no longer fails behind some reverse proxies
- Generating JPEG XL thumbnails of RAW photos no longer fails

[Full release notes](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
    es_ES: `Se actualizó copyparty a 1.20.28.

**Seguridad**

- Las claves de directorio (la opción de volumen \`dk\`) ya no permiten descargar desde subcarpetas ni otros accesos no previstos
- Los usuarios con acceso de lectura por SFTP ya no pueden truncar archivos
- Se corrigieron un problema de falsificación de solicitudes entre sitios y uno de scripting entre sitios

Ninguno de estos afecta a la configuración que genera StartOS; importan si activó las claves de directorio o SFTP en sus propios archivos de configuración.

**Correcciones**

- El inicio de sesión ya no falla detrás de algunos proxies inversos
- La generación de miniaturas JPEG XL de fotos RAW ya no falla

[Notas completas](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
    de_DE: `copyparty auf 1.20.28 aktualisiert.

**Sicherheit**

- Verzeichnisschlüssel (das Volume-Flag \`dk\`) erlauben keine Downloads aus Unterordnern oder andere unbeabsichtigte Zugriffe mehr
- Benutzer mit Lesezugriff über SFTP können keine Dateien mehr kürzen
- Eine Cross-Site-Request-Forgery- und eine Cross-Site-Scripting-Lücke wurden behoben

Keine davon betrifft die von StartOS erzeugte Konfiguration; sie sind relevant, wenn Sie Verzeichnisschlüssel oder SFTP in eigenen Konfigurationsdateien aktiviert haben.

**Fehlerbehebungen**

- Die Anmeldung schlägt hinter manchen Reverse-Proxys nicht mehr fehl
- Das Erzeugen von JPEG-XL-Vorschaubildern aus RAW-Fotos schlägt nicht mehr fehl

[Vollständige Versionshinweise](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
    pl_PL: `Zaktualizowano copyparty do 1.20.28.

**Bezpieczeństwo**

- Klucze katalogów (flaga woluminu \`dk\`) nie pozwalają już na pobieranie z podfolderów ani inny niezamierzony dostęp
- Użytkownicy z dostępem do odczytu przez SFTP nie mogą już obcinać plików
- Naprawiono podatność typu cross-site request forgery oraz cross-site scripting

Żadna z nich nie dotyczy konfiguracji generowanej przez StartOS; mają znaczenie, jeśli włączono klucze katalogów lub SFTP we własnych plikach konfiguracyjnych.

**Poprawki**

- Logowanie nie kończy się już niepowodzeniem za niektórymi odwrotnymi proxy
- Generowanie miniatur JPEG XL ze zdjęć RAW nie kończy się już błędem

[Pełne informacje o wydaniu](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
    fr_FR: `copyparty mis à jour vers 1.20.28.

**Sécurité**

- Les clés de répertoire (l'option de volume \`dk\`) ne permettent plus de télécharger depuis les sous-dossiers ni d'autres accès non prévus
- Les utilisateurs ayant un accès en lecture via SFTP ne peuvent plus tronquer de fichiers
- Correction d'une faille de falsification de requête intersite et d'une faille de script intersite

Aucune n'affecte la configuration générée par StartOS ; elles comptent si vous avez activé les clés de répertoire ou SFTP dans vos propres fichiers de configuration.

**Corrections**

- La connexion n'échoue plus derrière certains proxys inverses
- La génération de miniatures JPEG XL de photos RAW n'échoue plus

[Notes de version complètes](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
