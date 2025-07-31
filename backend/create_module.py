import os
import shutil
import sys
from dotenv import load_dotenv


def merge_folders(source, destination):
    """
    Mescla recursivamente os arquivos e subpastas de 'source' para 'destination'.
    Se um arquivo já existir em 'destination', ele será sobrescrito.
    """
    if not os.path.exists(destination):
        os.makedirs(destination)

    for item in os.listdir(source):
        source_item = os.path.join(source, item)
        dest_item = os.path.join(destination, item)

        # Se for diretório, chama a função recursivamente
        if os.path.isdir(source_item):
            merge_folders(source_item, dest_item)
        else:
            # Se for arquivo, copia para o destino
            # (sobrescrevendo se necessário)
            shutil.copy2(source_item, dest_item)


if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            print("Usage: python create_module.py <module_name>")
            sys.exit(1)
        name_module = sys.argv[1]
        load_dotenv()
        project_name = os.getenv("PROJECT_NAME")
        print(f"Project name: {project_name}")
        print(f"Module name: {name_module}")
        command = f"cookiecutter cookiecutter-template --no-input -f module_name={name_module}"
        os.system(command)
        tmp_folder = "./template-module"
        os.system(f"mkdir -p {tmp_folder}")
        merge_folders(tmp_folder, f'./{project_name}')
        os.system(f"rm -R {tmp_folder}")

        os.system(
            f"cd {project_name}; alembic revision --autogenerate -m 'create_{name_module}'"
        )
        print("Merge completed successfully!")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
