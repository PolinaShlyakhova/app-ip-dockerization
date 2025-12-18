# Лабораторная №2

Создание кластера Kind

kind create cluster

Развертывание приложения

kubectl apply -f .

Проверка

kubectl get all

Доступ к приложению

kubectl port-forward service/ip-app-service 8080:80

Открыть http://localhost:8080



